# Time Link Grid - Dark Node Graph

A modern, dark-themed node graph application built with React, TypeScript, and React Flow. Features real-time data nodes connected to customizable website links with straight-line connections.

## Features

- **Dark Theme**: Modern dark UI with neon blue accents
- **Real Node Structure**: Rectangular nodes with clear data boundaries
- **Straight Connections**: Clean straight-line edges instead of curves
- **Customizable URLs**: Configure your own website links via environment variables
- **Real-time Data**: Live time and date information
- **Docker Ready**: Containerized with Kubernetes support
- **Responsive Design**: Works on desktop and mobile devices

## Quick Start

### Local Development

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd time-link-grid
npm install
```

2. **Configure your URLs:**
```bash
cp .env.example .env
# Edit .env with your custom URLs and labels
```

3. **Start development server:**
```bash
npm run dev
```

### Docker Deployment

1. **Build and run with Docker:**
```bash
docker build -t time-link-grid .
docker run -p 3000:80 \
  -e VITE_NODE1_LABEL="My Dashboard" \
  -e VITE_NODE1_URL="https://dashboard.mycompany.com" \
  -e VITE_NODE2_LABEL="Analytics" \
  -e VITE_NODE2_URL="https://analytics.mycompany.com" \
  time-link-grid
```

2. **Or use Docker Compose:**
```bash
docker-compose up -d
```

### Kubernetes Deployment

1. **Deploy to Kubernetes:**
```bash
kubectl apply -f k8s/deployment.yaml
```

2. **Customize environment variables:**
Edit the ConfigMap in `k8s/deployment.yaml` with your URLs:
```yaml
data:
  VITE_NODE1_LABEL: "Your Custom Label"
  VITE_NODE1_URL: "https://your-custom-url.com"
  # ... add more nodes as needed
```

## Environment Variables

Configure your custom nodes using these environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_NODE1_LABEL` | Label for first node | "My Dashboard" |
| `VITE_NODE1_URL` | URL for first node | "https://dashboard.mycompany.com" |
| `VITE_NODE2_LABEL` | Label for second node | "Analytics" |
| `VITE_NODE2_URL` | URL for second node | "https://analytics.mycompany.com" |
| `VITE_NODE3_LABEL` | Label for third node | "Monitoring" |
| `VITE_NODE3_URL` | URL for third node | "https://monitoring.mycompany.com" |
| `VITE_NODE4_LABEL` | Label for fourth node | "Documentation" |
| `VITE_NODE4_URL` | URL for fourth node | "https://docs.mycompany.com" |
| `VITE_NODE5_LABEL` | Label for fifth node | "Support" |
| `VITE_NODE5_URL` | URL for fifth node | "https://support.mycompany.com" |
| `VITE_NODE6_LABEL` | Label for sixth node | "Admin Panel" |
| `VITE_NODE6_URL` | URL for sixth node | "https://admin.mycompany.com" |

## Architecture

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: React Flow for node graphs
- **Styling**: Custom CSS with CSS variables for theming
- **Containerization**: Multi-stage Docker build with Nginx
- **Orchestration**: Kubernetes with ConfigMap for environment variables

## Customization

### Adding More Nodes

1. Update `src/config/nodeConfig.ts` to add more nodes
2. Add corresponding environment variables to `.env.example`
3. Update Docker and Kubernetes configurations
4. Adjust node positions in `src/components/NodeGraph.tsx`

### Changing Theme Colors

Edit CSS variables in `src/styles/base.css`:
```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-accent-color;
  --color-background-dark: #your-bg-color;
}
```

## Health Check

The application includes a health check endpoint at `/health` for monitoring and load balancer integration.

## License

MIT License - see LICENSE file for details.