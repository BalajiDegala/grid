# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/360539b2-59d1-4975-baf1-c81ad5a96ac5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/360539b2-59d1-4975-baf1-c81ad5a96ac5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/360539b2-59d1-4975-baf1-c81ad5a96ac5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Customizing website nodes

The labels and URLs for the predefined website nodes can be changed without
touching the source code. Copy `.env.example` to `.env` and edit the values:

```bash
cp .env.example .env
# then update the VITE_* variables to point to your preferred sites
```

Vite exposes any environment variable starting with `VITE_` to the client. Each
node has both a `*_LABEL` and `*_URL` variable. Refer to `.env.example` for the
full list of supported variables.

## Deploying to Kubernetes

A sample Deployment and Service is provided in `k8s/deployment.yaml`. Apply it with:

```bash
kubectl apply -f k8s/deployment.yaml
```

This manifest also creates a ConfigMap containing the `VITE_*` environment variables. Update the file if you need different values.
