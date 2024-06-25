# LinkedIn_hackathon



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="myMentee.css">
    <title>LinkedIn My Network</title>


    <title>Rounded Rectangle Button</title>
    <style>
        .message-button {
            padding: 10px 20px;
            font-size: 16px;
            color: black;
            background-color: white;
            border: 2px solid rgb(10, 102, 205);
            border-radius: 28px; /* This makes the corners rounded */
            cursor: pointer;
            transition: background-color 0.3s;
            position: left;
        }

        .message-button:hover {
            background-color: rgb(10, 95, 193); /* Light blue background on hover */
        }
    </style>
</head>
<body>
    <div class="overlay">
        <header class="header">
            <div class="header-content flex items-center space-x-4">
                <nav class="header-nav flex space-x-4 mb-2">
                    <a href="#" class="text-blue-500 hover:underline">Your mentors</a>
                    <a href="#" class="text-blue-500 hover:underline">Your mentees</a>
                    <a href="#"><button class="bg-blue-500 text-white px-4 py-2 rounded mb-1">Create Profile</button></a>
                </nav>
            </div>
            <div class="header-line"></div>
        </header>
        <div class="content">
            <section class="invitations">
                <div class="invitation">
                    <img src="https://via.placeholder.com/60" alt="Profile Image" class="profile-image">
                    <div class="invitation-info">
                        <p class="name">John Doe</p>
                        <p class="occupation">Software Engineer at Company 
                            <button class="message-button float-right">Message</button>
                        </p>
                    </div>
                </div>
                <div class="invitation">
                    <img src="https://via.placeholder.com/60" alt="Profile Image" class="profile-image">
                    <div class="invitation-info">
                        <p class="name">Jane Smith</p>
                        <p class="occupation">Project Manager at Company 
                            <button class="message-button float-right">Message</button>
                        </div>
                </div>
                <!-- Add more invitations as needed -->
            </section>
        </div>
    </div>
</body>
</html>
