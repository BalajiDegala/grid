#!/bin/sh

# Function to replace environment variables in built files
replace_env_vars() {
    echo "Injecting environment variables..."
    
    # Find all JS files in the build directory
    find /usr/share/nginx/html -name "*.js" -type f -exec sed -i \
        -e "s|VITE_NODE1_LABEL_PLACEHOLDER|${VITE_NODE1_LABEL:-My Dashboard}|g" \
        -e "s|VITE_NODE1_URL_PLACEHOLDER|${VITE_NODE1_URL:-https://dashboard.mycompany.com}|g" \
        -e "s|VITE_NODE2_LABEL_PLACEHOLDER|${VITE_NODE2_LABEL:-Analytics}|g" \
        -e "s|VITE_NODE2_URL_PLACEHOLDER|${VITE_NODE2_URL:-https://analytics.mycompany.com}|g" \
        -e "s|VITE_NODE3_LABEL_PLACEHOLDER|${VITE_NODE3_LABEL:-Monitoring}|g" \
        -e "s|VITE_NODE3_URL_PLACEHOLDER|${VITE_NODE3_URL:-https://monitoring.mycompany.com}|g" \
        -e "s|VITE_NODE4_LABEL_PLACEHOLDER|${VITE_NODE4_LABEL:-Documentation}|g" \
        -e "s|VITE_NODE4_URL_PLACEHOLDER|${VITE_NODE4_URL:-https://docs.mycompany.com}|g" \
        -e "s|VITE_NODE5_LABEL_PLACEHOLDER|${VITE_NODE5_LABEL:-Support}|g" \
        -e "s|VITE_NODE5_URL_PLACEHOLDER|${VITE_NODE5_URL:-https://support.mycompany.com}|g" \
        -e "s|VITE_NODE6_LABEL_PLACEHOLDER|${VITE_NODE6_LABEL:-Admin Panel}|g" \
        -e "s|VITE_NODE6_URL_PLACEHOLDER|${VITE_NODE6_URL:-https://admin.mycompany.com}|g" \
        {} \;
    
    echo "Environment variables injected successfully!"
}

# Replace environment variables
replace_env_vars

# Execute the main command
exec "$@"