import "bootstrap/dist/css/bootstrap.min.css";

function HomePage({ data }) {
    return (
        <div class="container">
            <h1 class="text-center">Bem vindo ao gerenciador de conteúdos!</h1>
            <p><a href="/add" class="btn btn-success">Novo artigo</a></p>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Título</th>
                        <th scope="col">Versões</th>
                        <th scope="col">Data de criação</th>
                        <th scope="col">Data de modificação</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(element => {
                        return (<tr>
                            <th scope="row">{ element.id }</th>
                            <td>{ typeof element.title === "string" ? element.title : "" }</td>
                            <td>{ Array.isArray(element.content) ? element.content.length : "0" }</td>
                            <td>{
                                typeof element.createdAt === "string"
                                    ? (() => {
                                        let date = new Date(element.createdAt);
                                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                                    })()
                                    : ""
                            }</td>
                            <td>{
                                typeof element.updatedAt === "string"
                                    ? (() => {
                                        let date = new Date(element.updatedAt);
                                        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
                                    })()
                                    : ""
                            }</td>
                            <td>{ element.status ? "Publicado" : "Despublicado" }</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    <a class="btn btn-outline-dark" href={`/edit?id=${element.id.replace("article#", "")}`}>Editar</a>
                                    <a class="btn btn-outline-success">Visualizar</a>
                                    <button class="btn btn-outline-danger" onClick={e => deleteArticle(element.id)}>Excluir</button>
                                </div>
                            </td>
                        </tr>); 
                    })}
                </tbody>
                </table>
        </div>
    );
}

async function deleteArticle(articleId) {
    if (confirm("Deseja excluir esse artigo? Essa ação é irreversível!")) {
        try {
            await fetch(
                "http://localhost:8080",
                {
                    method: "PATCH",
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(
                        [
                            {
                                "op": "remove",
                                "path": `/article/${articleId}`
                            }
                        ]
                    )
                }
            );
            
            alert("Artigo excluído com sucesso.");
            document.location.reload();
        } catch (error) {
            alert("Não foi possível excluir o artigo.");
        }
    }
}

export async function getServerSideProps() {
    const url = new URL('/list', process.env.HOST);
    const res = await fetch(url);
    const data = await res.json();

    return {
        props: {
            data
        }
    };
}

export default HomePage;