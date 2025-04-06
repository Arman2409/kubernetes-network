# Server

## How to run locally

1. Download and install Go on your machine from the official site:  
   [Go Downloads](https://go.dev/dl/)

2. Install all required dependencies
```bash
  go mod download
```

3. Set up the environment varaibles
```
  DATABASE_URL=<database-url>
```

4. Run the server (this will automatically set up and seed the database)
```bash
  go run main.go
```

## CMD commands

1. Migrate the database
```bash 
  go run main.go migrate
```

2. Seed the database
```bash
  go run main.go seed
```