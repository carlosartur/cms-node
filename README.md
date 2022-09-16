#### Listar todos os conteúdos, publicados e despublicados:

GET http://localhost:8080/list

**Exemplo de retorno**
```
[
    {
        "id": "article#dc046f60-3f4b-48cc-95fa-c457572667d1",
        "createdAt": "2022-09-15T00:38:55.610Z",
        "updatedAt": "2022-09-15T00:38:55.610Z",
        "title": "Teste de adicionar artigo pelo front",
        "content": [
        {
            "id": "contentHistory#0038bf2f-96cc-495d-8ce6-efea82847a16",
            "createdAt": "2022-09-15T00:38:55.610Z",
            "updatedAt": "2022-09-15T00:38:55.610Z",
            "body": "<p>Bah tem que ver esse troco ai</p>",
            "versionNumber": 1
        },
        {
            "id": "contentHistory#dd2cc04a-fe5f-4287-bf69-c7ec7ef156a6",
            "createdAt": "2022-09-15T03:54:19.476Z",
            "updatedAt": "2022-09-15T03:54:19.476Z",
            "body": "<p>Bah tem que ver<strong> esse troco ai</strong></p>",
            "versionNumber": 2
        },
        {
            "id": "contentHistory#9b8d6f1b-c382-44ee-8ba5-c2ee84297f9c",
            "createdAt": "2022-09-15T04:11:53.649Z",
            "updatedAt": "2022-09-15T04:11:53.649Z",
            "body": "<p>Bah tem que ver<strong> esse troco ai</strong></p>",
            "versionNumber": 3
        }
        ],
        "author": "Anônimo",
        "status": true
    }
]
```

#### Obter um único artigo

GET http://localhost:8080/get?id=dc046f60-3f4b-48cc-95fa-c457572667d1

**Exemplo de retorno**

```
{
    "id": "article#dc046f60-3f4b-48cc-95fa-c457572667d1",
    "createdAt": "2022-09-15T00:38:55.610Z",
    "updatedAt": "2022-09-15T00:38:55.610Z",
    "title": "Teste de adicionar artigo pelo front",
    "content": [
        {
            "id": "contentHistory#0038bf2f-96cc-495d-8ce6-efea82847a16",
            "createdAt": "2022-09-15T00:38:55.610Z",
            "updatedAt": "2022-09-15T00:38:55.610Z",
            "body": "<p>Bah tem que ver esse troco ai</p>",
            "versionNumber": 1
        },
        {
            "id": "contentHistory#dd2cc04a-fe5f-4287-bf69-c7ec7ef156a6",
            "createdAt": "2022-09-15T03:54:19.476Z",
            "updatedAt": "2022-09-15T03:54:19.476Z",
            "body": "<p>Bah tem que ver<strong> esse troco ai</strong></p>",
            "versionNumber": 2
        },
        {
            "id": "contentHistory#9b8d6f1b-c382-44ee-8ba5-c2ee84297f9c",
            "createdAt": "2022-09-15T04:11:53.649Z",
            "updatedAt": "2022-09-15T04:11:53.649Z",
            "body": "<p>Bah tem que ver<strong> esse troco ai</strong></p>",
            "versionNumber": 3
        }
    ],
    "author": "Anônimo",
    "status": true
}
```

#### Criar um novo artigo

POST http://localhost:8080/create

**Exemplo de Corpo de requisição(body)**
```
{
  	"title": "Teste da Api",
    "body": "Teste da API Versão 1",
    "author": "Anônimo",
    "status": true
}
```

**Exemplo de Corpo de retorno**

```
{
    "id": "article#b44144f6-13fc-4784-8395-5b7cd015facf",
    "createdAt": "2022-09-16T03:00:55.991Z",
    "updatedAt": "2022-09-16T03:00:55.991Z",
    "title": "Teste da Api",
    "content": [
        {
            "id": "contentHistory#b4523699-9491-4b04-bb2e-41af6994daf3",
            "createdAt": "2022-09-16T03:00:55.991Z",
            "updatedAt": "2022-09-16T03:00:55.991Z",
            "body": "Teste da API Versão 1",
            "versionNumber": 1
        }
    ],
    "author": "Anônimo",
    "status": true
}
```

#### Excluir um artigo

DELETE http://localhost:8080/?id=dc046f60-3f4b-48cc-95fa-c457572667d1

**Exemplo de Corpo de retorno**

```
{
    "message": "Article #dc046f60-3f4b-48cc-95fa-c457572667d1 deleted with success!"
}
```

#### Atualizar um artigo

PATCH http://localhost:8080/update?id=c5d9d731-e1bd-46c4-a7c9-f0a88ce064fa

**Exemplo de corpo de requisição**
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

**Exemplo de corpo de retorno**

{
    "id": "article#c5d9d731-e1bd-46c4-a7c9-f0a88ce064fa",
    "createdAt": "2022-09-15T23:07:53.300Z",
    "updatedAt": "2022-09-16T02:57:26.798Z",
    "title": "Titulo",
    "content": [
        {
            "id": "contentHistory#7ce199ed-2fee-4990-bd9b-b4f425d4de7d",
            "createdAt": "2022-09-15T23:07:53.300Z",
            "updatedAt": "2022-09-16T02:57:26.798Z",
            "body": "Texto novinho em folha",
            "versionNumber": 1
        }
    ],
    "author": "Anônimo",
    "status": true
}

#### Atualizar vários artigos

PATCH http://localhost:8080

**Exemplo de corpo de requisição**

```
[{
	"op": "replace",
	"path": "/article/article#a520036d-dcac-433d-9cde-309110c56b3e",
	"value": {
		"status": true
	}
}, {
	"op": "replace",
	"path": "/article/article#0460bf88-e729-4f08-9ca9-eb0ff4a94123",
	"value": {
		"status": true
	}
}, {
	"op": "replace",
	"path": "/article/article#3dfcf8f1-62ef-4a9d-9383-a26559096faa",
	"value": {
		"status": true
	}
}]
```

#### Remover vários artigos

PATCH http://localhost:8080

**Exemplo de corpo de requisição**

```
[{
	"op": "remove",
	"path": "/article/article#a520036d-dcac-433d-9cde-309110c56b3e"
}, {
	"op": "remove",
	"path": "/article/article#89d34778-ad5e-463e-8dc7-601bc6ce8015"
}]
```