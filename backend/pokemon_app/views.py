from django.contrib.auth import logout, login, authenticate
from django.forms import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.core import serializers
from rest_framework.decorators import api_view
from .models import AppUser as User, Trainer, Pokemon, Attacks


def home(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)


@api_view(['POST'])
def sign_up(request):
    try:
        User.objects.create_user(username=request.data['email'], password=request.data['password'],
                                 email=request.data['email'])
    except Exception as e:
        print(str(e))
        return JsonResponse({'signup': 'failure'})
    return JsonResponse({'signup': 'success'})


@api_view(['POST'])
def log_in(request):
    print("log_in requested")
    email = request.data['email']
    password = request.data['password']
    user = authenticate(username=email, password=password)

    if user is not None:
        if user.is_active:
            try:
                login(request._request, user)
                return JsonResponse({'login': 'success'})

            except Exception as e:
                return JsonResponse({'login': e})

        else:
            return JsonResponse({'login': 'not active'})

    else:
        return JsonResponse({'login': 'no user'})


@api_view(['POST'])
def log_out(request):
    logout(request)

    return JsonResponse({'success': True})


@api_view(['GET'])
def who_am_i(request):
    if request.user.is_authenticated:
        data = serializers.serialize("json", [request.user], fields=['email', 'username', 'clicks'])

        return HttpResponse(data)

    else:
        return JsonResponse({'user': None})


@api_view(['GET', 'POST', 'DELETE'])
def trainer(request):
    if request.user.is_authenticated:
        trainer_check = Trainer.objects.filter(account_id=request.user).exists()

        if request.method == 'GET':
            if trainer_check:
                active_trainer = serializers.serialize("json", [Trainer.objects.get(account_id=request.user)])

                return JsonResponse({'trainer': active_trainer})

            else:
                return JsonResponse({'trainer': 'None'})

        elif request.method == 'POST':
            if request.data['isSwap']:
                if trainer_check:
                    current_trainer = Trainer.objects.get(account_id=request.user)

                    # Let's grab the data to be able to make the proper changes
                    new_slot_one = request.data['slot_one_to']
                    old_slot_id = request.data['slot_id']
                    # We only allow swapping to the first slot from any other slot
                    old_slot_one = current_trainer.pokemon_slot_1

                    if old_slot_id == 1:
                        return JsonResponse({'swap-failure': 'You cannot swap to the same slot.'})

                    current_trainer.pokemon_slot_1 = new_slot_one

                    if old_slot_id == 2:
                        current_trainer.pokemon_slot_2 = old_slot_one
                    elif old_slot_id == 3:
                        current_trainer.pokemon_slot_3 = old_slot_one
                    elif old_slot_id == 4:
                        current_trainer.pokemon_slot_4 = old_slot_one
                    elif old_slot_id == 5:
                        current_trainer.pokemon_slot_5 = old_slot_one
                    elif old_slot_id == 6:
                        current_trainer.pokemon_slot_6 = old_slot_one

                    current_trainer.save()
                    # TODO Update this return to actually provide valuable json data
                    return JsonResponse({'swap': 'yup'})
            else:
                try:
                    Trainer.objects.create(account_id=request.user, trainer_name=request.data['name'],
                                           trainer_gender=request.data['gender'])
                except Exception as e:
                    print(str(e))

                return JsonResponse({'user': 'Created user'})

        elif request.method == 'DELETE':
            if trainer_check:
                Trainer.objects.get(account_id=request.user).delete()

                return JsonResponse({'user': 'deleted user'})

            else:
                return JsonResponse({'user': 'Couldnt delete'})

    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def pokemon(request):
    if request.user.is_authenticated:
        req_poke = request.data['poke']
        trainer_check = Trainer.objects.filter(account_id=request.user).exists()

        if not trainer_check:
            return JsonResponse({'Trainer': "No trainer found."})

        selected_trainer = Trainer.objects.get(account_id=request.user)

        if req_poke == 'starter':
            starter = Pokemon.objects.create(
                trainer=selected_trainer,
                name=request.data['details']['name'],
                pokedex_number=request.data['details']['pokedex_number'],
                level=request.data['details']['level'],
                reqExp=request.data['details']['level'] * 10,
                health=request.data['details']['max_health'],
                speed=request.data['details']['speed'],
                accuracy=request.data['details']['accuracy'],
                offence=request.data['details']['offence'],
                defence=request.data['details']['defence'],
                current_health=request.data['details']['max_health'],
                attack_slot_1='Tackle',
                attack_slot_2=request.data['details']['attack_list'],
                attack_slot_3='n',
                attack_slot_4='n',
            )

            selected_trainer.pokemon_slot_1 = starter.pk
            selected_trainer.save()

            return JsonResponse({"Createdstarter": model_to_dict(starter)})

        if req_poke == 'catch':
            slot_1 = request.data['details']['attack_list'][0]['data']['attackObj']['name']
            slot_2 = 'n'
            slot_3 = 'n'
            slot_4 = 'n'

            if len(request.data['details']['attack_list']) > 3:
                slot_4 = request.data['details']['attack_list'][3]['data']['attackObj']['name']

            if len(request.data['details']['attack_list']) > 2:
                slot_3 = request.data['details']['attack_list'][2]['data']['attackObj']['name']

            if len(request.data['details']['attack_list']) > 1:
                slot_2 = request.data['details']['attack_list'][1]['data']['attackObj']['name']

            caught = Pokemon.objects.create(
                trainer=selected_trainer,
                name=request.data['details']['name'],
                pokedex_number=request.data['details']['pokedex_number'],
                level=request.data['details']['level'],
                reqExp=request.data['details']['level'] * 10,
                health=request.data['details']['max_health'],
                speed=request.data['details']['speed'],
                accuracy=request.data['details']['accuracy'],
                offence=request.data['details']['offence'],
                defence=request.data['details']['defence'],
                current_health=request.data['details']['max_health'],
                attack_slot_1=slot_1,
                attack_slot_2=slot_2,
                attack_slot_3=slot_3,
                attack_slot_4=slot_4,
            )

            if selected_trainer.pokemon_slot_1 == 0:
                selected_trainer.pokemon_slot_1 = caught.pk
            elif selected_trainer.pokemon_slot_2 == 0:
                selected_trainer.pokemon_slot_2 = caught.pk
            elif selected_trainer.pokemon_slot_3 == 0:
                selected_trainer.pokemon_slot_3 = caught.pk
            elif selected_trainer.pokemon_slot_4 == 0:
                selected_trainer.pokemon_slot_4 = caught.pk
            elif selected_trainer.pokemon_slot_5 == 0:
                selected_trainer.pokemon_slot_5 = caught.pk
            else:
                selected_trainer.pokemon_slot_6 = caught.pk

            selected_trainer.save()

            return JsonResponse({'caught': model_to_dict(caught)})

        pokemon_check = Pokemon.objects.filter(pk=req_poke).exists()

        result = Pokemon.objects.filter(trainer=request.data['trainer']).values()
        list_result = [entry for entry in result]

        if pokemon_check:
            selected_poke = Pokemon.objects.get(pk=req_poke)
            return JsonResponse({"poke": model_to_dict(selected_poke), "listOfPoke": list_result})

    return JsonResponse({'poke_fail': 'No Data'})


@api_view(['POST'])
def attack(request):
    if request.user.is_authenticated:
        requested_attack = request.data['requested_attack']
        attack_exists = Attacks.objects.filter(name=requested_attack).exists()

        if attack_exists:
            selected_attack = Attacks.objects.get(name=requested_attack)
            return JsonResponse({'attackObj': model_to_dict(selected_attack)})

        return JsonResponse({'attackObj': "Attack Doesn't exists"})

    return JsonResponse({'poke_fail': 'No Data'})
