# PulseCare

## Purpose

PulseCare is a full-stack blood donation management platform that connects blood donors with recipients. Users can search for donors, create and manage blood donation requests, make funding donations through Stripe, and access role-based dashboards for donors, volunteers, and administrators.

## Live URL

Frontend:https://pulsecare-client.vercel.app

Backend: https://pulsecare-server.vercel.app

## Key Features

- JWT-based authentication and protected APIs
- Role-based dashboard for Admin, Donor, and Volunteer
- Create, update, delete, and manage blood donation requests
- Search donors by blood group, district, and upazila
- Donate to blood requests and update donation status
- Stripe payment integration for funding
- Dynamic dashboard statistics
- Responsive user interface for desktop and mobile devices

## NPM Packages Used

### Frontend

- next
- react
- react-dom
- tailwindcss
- react-icons
- better-auth
- sweetalert2
- react-hook-form
- zod
- @hookform/resolvers

### Backend

- express
- mongodb
- cors
- dotenv
- jsonwebtoken
- cookie-parser
- stripe
