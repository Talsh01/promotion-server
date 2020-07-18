# Promotion Server

REST API for getting information about promotions. The data is saved on a mongoDB cloud server.

## Requirements

For development, you will only need Node.js and npm installed in your environement.

## Development server

Run `npm install`, then `npm run dev` for a dev server.
    

## API

### Get all promotions

Get all promotion data - Get request

> http://localhost:8080/promotion/get

### Generate new data

Created 10,000 promotion data (and deletes existing) - Get request

> http://localhost:8080/promotion/create

### Delete promotion

Delete one/many promotions - Post request
must provide _ids in request body

> http://localhost:8080/promotion/delete

`body: 
{
	"_ids": ["5f1328943e4d722574083164", "5f1328943e4d722574083165"]
}
`

### Update promotion

Updates a promotion with the given values - Post request
must provide all promotion properties in request body

> http://localhost:8080/promotion/update

`body: 
{
	"_id": "5f10f3457af7cf342c2a018f",
	"Name": "05xFTWjIMa",
	"Type": "Tal",
	"StartDate": "05/31/2020",
	"EndDate": "05/29/2020",
	"UserGroupName": "GbOaw"
}
`

### Duplicate promotion

Duplicates a promotion- saves a new promotion in the db with the same properties - Post request
must provide _id in request body

> http://localhost:8080/promotion/duplicate

`body: 
{
	"_id": "5f1328943e4d722574083164"
}
`



