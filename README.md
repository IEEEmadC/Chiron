# Chiron
## Allergy Reminder
This project is being used for IEEEmadC (Deadline for app-developement phase being 12 June, 2016)


## Chiron-Frontend
It uses Ionic Framework. You should have pre-requisites installed for `ionic build platform`. Platform files aren't uploaded on Github. <br/>
For **android**, `cd` into Chiron-Frontend, and `ionic build android`. <br/>
For **ios**, use ios-alternate folder, and type `ionic build ios`

## Chiron-Backend-Bundle
It holds the files which host the server for the REST API calls functioning on the personal cloud database for the salts deployed on mLab hosted by Heroku (Free service. Might take few seconds to load after 8 hours* of inactivity)

## Chiron-Salts-Scrapping
Contains Python script used to scrape data from TrueMD.in to create the database for salts.  
