# Use the official PostgreSQL image as the base image
FROM postgres:15

# Set environment variables for PostgreSQL configuration
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydatabase

# Expose the default PostgreSQL port
EXPOSE 5432

# Optional: Set a health check to ensure the database is running
HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD pg_isready -U $POSTGRES_USER -d $POSTGRES_DB || exit 1

# Default command to start PostgreSQL
CMD ["postgres"]