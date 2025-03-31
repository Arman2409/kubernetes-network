# Use a lean Go base image
FROM golang:latest as builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum to download dependencies
COPY go.mod go.sum ./

# Download all dependencies. Caching them will speed up future builds
RUN go mod download

# Copy the source from the current directory to the working directory inside the container
COPY . .

# Build the Go application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o main ./main.go

# Use a minimal runtime image
FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/main .

# Env
ENV DATABASE_URL=postgresql://myuser:mypassword@postgres-service:5432/mydatabase

# Expose the port your Gin server listens on (e.g., 8080)
EXPOSE 8080

# Run the executable
CMD ["./main"]