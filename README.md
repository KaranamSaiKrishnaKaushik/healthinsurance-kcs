# Health Insurance Options

A static website built with `index.html` and `styles.css`. No Node.js dependencies,
backend, or application build are required.

## Preview locally

Open `index.html` in a browser, or run:

```powershell
python -m http.server 8080
```

Visit http://localhost:8080. Stop the server with Ctrl+C.

## Deploy to Azure Static Web Apps

Azure Static Web Apps hosts the HTML and CSS directly; it does not run a custom
container image. This repository includes a GitHub Actions deployment workflow
and `staticwebapp.config.json` for the site configuration.

1. Create an Azure Static Web App in the Azure portal. Select **Other** as the
   deployment source to use the workflow already in this repository. Select
   deployment token authorization if prompted.
2. Copy the deployment token from the Azure resource's **Manage deployment token**
   option.
3. In this GitHub repository, open **Settings > Secrets and variables > Actions**
   and add a repository secret named `AZURE_STATIC_WEB_APPS_API_TOKEN` with that
   token as its value. Keep the token out of committed files.
4. Run **Actions > Deploy Azure Static Web App > Run workflow**, or push a commit
   to `main`. Open the site URL shown in the Azure resource.

The workflow stages only `index.html`, `styles.css`, and `staticwebapp.config.json`
in `dist/`. It sets `app_location: dist`, `output_location: ''`, and
`skip_app_build: true` to upload these files without a build. Add any future
public assets to the staging command as well. Missing deployment credentials
skip the upload and print a setup message.

If you instead let the portal generate a GitHub workflow, use the HTML preset,
app location `/`, no API location, and no output location. Keep just one deployment
workflow enabled to avoid duplicate deployments; the included workflow stages only
public files and is the recommended configuration for this repository.

## Optional container hosting later

The `Dockerfile` serves the same HTML and CSS with Nginx on port **8080**:

```powershell
docker build -t healthinsurance-kcs:local .
docker run --rm -p 8080:8080 healthinsurance-kcs:local
```

Visit http://localhost:8080. To run this image on Azure, publish it to a container
registry and use **Azure Container Apps** (HTTP ingress target port `8080`) or
**Azure App Service for Linux containers** (configure its container port as `8080`;
classic custom containers use `WEBSITES_PORT=8080`). Container hosting is a separate
deployment path from Azure Static Web Apps. No image is built or published by the
Static Web Apps workflow. Azure's `staticwebapp.config.json` applies only to Static
Web Apps; container HTTP behavior is configured in `nginx.conf`.

Before publishing the site, replace the placeholder `hello@example.com` contact
address in `index.html` with your actual contact address.

References: [Static Web Apps build configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration),
[site configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration),
and [App Service custom containers](https://learn.microsoft.com/en-us/azure/app-service/configure-custom-container).
