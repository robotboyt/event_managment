# Event Managment App

This project was created with [Django](https://www.djangoproject.com/) and [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `docker-compose up --build`

Open [Frontend](http://localhost:3000) to view it in the browser.

As well as [Backend](http://localhost:8000/api/events/) to watch backend!

# About Project

I created this project using [Django](https://www.djangoproject.com/) , where I utilized its built-in utilities. I tried to add strict typing to make the project more robust and safe for future changes. The project includes both a backend and a frontend part. Both have the same full functionality, but with the frontend you can visually see everything happening through the browser.

You can:

- Register
- View events
- Create your own events
- Edit or delete your events
- Subscribe to other users' events and receive email notifications

I decided not to use a real email client, so in the `settings.py` file at the root of the Django project, you can find settings for a real email client at the end of the file. Instead, I used a virtual email backend that sends similar emails to the console when a user subscribes to an event.

Also, I added `filtering functionality`. Due to tight deadlines, I did not add it to the frontend, but it works perfectly through the browser using queries like `/api/events/?title=Web` and similar.

It was interesting to build such a project. Overall, the development took me about 8-9 hours, with 2 of those hours spent on the frontend.
