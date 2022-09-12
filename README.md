GET http://localhost:8080/list

POST http://localhost:8080/create

{
  	"title": "texto curto, obrigatório, sem formatação 2",
	"body": "texto longo, opcional, com formatação (wysiwyg)",
	"author": "oculto, obrigatório",
	"status": true
}


PATCH http://localhost:8080/update?id=79a55de0-40e0-4941-ae63-a2b3f8c7c2f1

[
  {
    "op": "add",
    "path": "/status",
    "value": true
  },
  {
    "op": "replace",
    "path": "/title",
    "value": "Titulo"
  },
  {
    "op": "replace",
    "path": "/content/0",
    "value": {
		"body": "Texto novinho em folha",
      	"versionNumber": 1
	}
  }
]