import json

from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings
from .forms import ContactForm

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail



# Create your views here.
def home_page(request):
    template = 'pages/home.html'
    return render(request, template)


# ajax request ans response handle
def contact_view(request):
    ''' 
    Handle contact form submission via AJAX and send email.
    and also send JSON response back to the front end site which shows success or error masseges message.
    '''
    if request.method == 'POST':
        try:
            # Parse JSON data from request
            data = json.loads(request.body)
            print(data)
            print(request)
            print(request.META)

            form = ContactForm(data)
            print('problem paas this area')

            if form.is_valid():
                print('pass this area too?')
                name = form.cleaned_data['name']
                email = form.cleaned_data['email']
                form_message = form.cleaned_data['message']
                
                # Using SendGrid to send email
                message = Mail(
                    from_email=settings.SENDGRID_FROM_EMAIL,
                    to_emails='squalporeover.ju@gmail.com',
                    subject= f'From portfolio site {name}',
                    html_content=f'<strong>{form_message}<br></br>{email}</strong>'
                    )

                try:
                    sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
                    response = sg.send(message)
                       
                    return JsonResponse({
                        'status': 'success',
                        'message': 'Your message has been sent successfully!'
                    })
                except:
                    return JsonResponse({
                        'status': 'error',
                        'message': 'Failed to send email. Please try again later.'
                    }, status=500)

            else:
                return JsonResponse(
                    {'status': 'error',
                    'message': 'Please fill in all fields correctly.',
                    'errors': form.errors}, 
                    status=400)
                
        except:
            return JsonResponse({
                'status': 'error',
                'message': 'Invalid request data.'
            }, status=400)
    
    return JsonResponse({
        'status': 'error',
        'message': 'Invalid request method.'
    }, status=405)
