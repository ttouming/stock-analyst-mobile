# stock-analyst-mobile
## Description
This react native app provides smoothly operated basic functions for user to have quick glimpse of stock market and view the selected stocks in their watchlist. Moreover, user can have a more detailed information when they navigate to quote screen with selected stock. They can see a cleanly displayed table with latest index and a historical graph. Additionally, the app allows user to register their own account that can store watchlist data for user. 
The front-end is using React Native in Expo frame work which provides a basic view and fetches needed data from FMP API(you have to apply your own FMP api key to use the app). As for the back-end, it is using Express.js which provides some post and get functions for front-end to store and get the data. The database is using MySQL to store the data.

## Function
There six main screens in my app. They are Signup, Login, Tutorial, Search, Stock and Quote screen. For signup screen, user can input their email address and password to register into the app, and the app would store user data into database. As for login which is the first page user see when they opened the app, user can login the app by entering their registered email and password. User can navigate into signup screen, tutorial screen and stock screens from login screen. The front-end would verify the user input email and password with back-end when logging in. Speaking of tutorial screen, user can navigate into signup screen, tutorial screen and stock screens from here. Turning to search screen, user can search desire stocks by entering stock symbol into search bar. Search screen shows 100 stock symbol, name and sector. For stock screen which is to display watchlist, User can view latest price and changes of selected stocks in stock screen (watchlist). The front-app will fetch the updated watchlist data to and from database for user when they login, add and delete symbol. Then, user can see their watchlist in stock screen when they login next time. Last is quote page, User can navigate to quote screen to see latest price indexes table and historical graph by pressing a symbol from stock screen. user can select different range of time by pressing button of 1W(week), 1M(month), 3M, 6M and 1Y(year).

*You have to create your own sql database.

![image](https://user-images.githubusercontent.com/115144351/203706599-dd9406a0-42f8-4798-8bf8-0431e88e8c55.png)
(Signup screen)

![image](https://user-images.githubusercontent.com/115144351/203706650-22cd3004-4b9f-4d26-9685-dffdae60bbcb.png)
(Login screen)

![image](https://user-images.githubusercontent.com/115144351/203706661-b7b83f5a-bc5c-46b4-8102-2d7775959749.png)
(Tutorial screen)

![image](https://user-images.githubusercontent.com/115144351/203706682-a37f3362-a284-4272-96e0-f4b399db6d4b.png)
(Search screen)

![image](https://user-images.githubusercontent.com/115144351/203706705-f5b8318f-83a3-4fce-9a74-a7514b10f5a0.png)
(Stock screen)

![image](https://user-images.githubusercontent.com/115144351/203706762-cb5c095e-548c-4aa1-94bb-420b0399c7b6.png)
(Quote screen)

## User guide


