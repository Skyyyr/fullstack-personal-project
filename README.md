# POKEMON-LITE

Welcome to "Pokemon-lite"! With this project we attempt to emulate certain aspects of the original Pokemon games, such as
music, finding pokemon, catching pokemon, and battling pokemon! This is still a lite version and the mechanics for
each of these are aimed to be a 'birds-eye-view' of the original content. An example of this would be combat, it
functions very similar to the originals but the calculations regarding accuracies, and damage are not properly emulated.


### How does it work?
You must first sign up for an account on the website to gain access to the game. Once signed up you'll gain
access to the play menu, from there you can select to create a new game; load an existing game; or delete an existing game.

If you haven't made your trainer yet then you wont be allowed to load or delete.

After creating your trainer you will be allowed to 'play' the game by using the 'find pokemon' button.
If you find a pokemon you want to fight, or capture you can do so with the provided buttons, or simply 'run' away

Clicking on any of your pokemon - if you have more than 1 that is - will swap that pokemon to your first slot.
Why does this matter? For combat the pokemon in slot 1 is the combat you start with (You can swap mid fight)


### Combat
Once you select 'find pokemon' a random pokemon and your pokemon in slot 1 (your first pokemon)
will both appear and immediately we determine which pokemon has the highest speed.
The highest speed goes first always!

### Catching pokemon
Select catch and you automatically catch the pokemon
WARNING: It's not intended for you to exceed 6 pokemon and capturing more than 6 will result in unattended behavior
(This is due to not implementing the pokemon storage mechanics that allow you to swap active pokemon with stored pokemon)



# Behind the curtains

### Models
* AppUser
  * This is the main account for the user - they register for this account
* Trainer
  * Once a user finishes making a new game they will have a trainer table
* Attacks
  * This contains all attacks for the pokemon to use for the game
* Pokemon
  * All pokemon generated to the db are owned by trainers - we generated random stats for 'wild' pokemon and use those stats when caught
  * experience for leveling, levels, 'health persist' are shown in code for implementation if time permits
  * Attacks are generated - all pokemon have tackle! but up to 4 attacks

