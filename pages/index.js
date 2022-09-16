import "bootstrap/dist/css/bootstrap.min.css";

function HomePage({ data }) {
    return (
        <div className="container">
            <h1 className="text-center">Bem vindo ao gerenciador de conteúdos!</h1>
            <div className="card align-middle">
                <div className="card-header">
                    <h3 className="text-center">Lista de Artigos</h3>
                    <div className="float-end">
                        <div className="btn-group" role="group" aria-label="Basic outlined example">
                            <button type="button" className="btn btn-primary" onClick={e => publishMultiple()}>Publicar</button>
                            <button type="button" className="btn btn-dark" onClick={e => publishMultiple(false)}>Despublicar</button>
                            <button type="button" className="btn btn-danger" onClick={e => deleteMultiple()}>Excluir</button>
                            <a href="/add" className="btn btn-success">Novo artigo</a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <section>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
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
                                {data.map((element, index) => {
                                    return (<tr key={index}>
                                        <th>
                                        <input
                                            id={`articlePublished${index}`}
                                            className="form-check-input mt-0"
                                            type="checkbox"
                                            value={element.id}
                                        />
                                        </th>
                                        <td scope="row">
                                            <small className="text-muted">
                                                {element.id}
                                            </small>
                                        </td>
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
                                            <div className="btn-group" role="group" aria-label="Basic outlined example">
                                                <a className="btn btn-outline-dark" href={`/edit?id=${element.id.replace("article#", "")}`}>Editar</a>
                                                <a className="btn btn-outline-success" href={`/visualize?id=${element.id.replace("article#", "")}`}>Visualizar</a>
                                                <button className="btn btn-outline-danger" onClick={e => deleteArticle(element.id)}>Excluir</button>
                                            </div>
                                        </td>
                                    </tr>); 
                                })}
                            </tbody>
                            </table>
                    </section>
                </div>
            </div>
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

async function publishMultiple(status = true) {
    const list = getListToMultipleActions();
    
    if (!list.length) {
        alert(`Não há artigos selecionados para serem modificados.`);
        return;
    }

    try {
        const data = list.map(articleId => {
            return {
                "op": "replace",
                "path": `/article/${articleId}`,
                "value": { status }
            };
        });

        await fetch(
            "http://localhost:8080",
            {
                method: "PATCH",
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(data)
            }
        );
        
        document.location.reload();
    } catch (error) {
        alert("Não foi possível despublicar os artigos.");
    }
}

async function deleteMultiple() {
    const list = getListToMultipleActions();
    
    if (!list.length) {
        alert(`Não há artigos selecionados para serem excluídos.`);
        return;
    }

    if (confirm(`Deseja excluir os ${list.length} artigos selecionados? Essa ação é irreversível!`)) {
        try {
            const data = list.map(articleId => {
                return {
                    "op": "remove",
                    "path": `/article/${articleId}`
                };
            });

            await fetch(
                "http://localhost:8080",
                {
                    method: "PATCH",
                    mode: 'cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: JSON.stringify(data)
                }
            );
            
            alert("Artigos excluídos com sucesso.");
            document.location.reload();
        } catch (error) {
            alert("Não foi possível excluir os artigos.");
        }
    }
}

const getListToMultipleActions = () => {
    return [... document.getElementsByClassName("mt-0")]
        .filter(item => item.checked)
        .map(item => item.value);
}

export async function getServerSideProps() {
    const url = new URL('/list', process.env.HOST);
    const res = await fetch(url);
    const data = await res.json();

    data.sort((a, b) => {
        let firstDate = new Date(a.updatedAt),
            secondDate = new Date(b.updatedAt);
        
        if (firstDate < secondDate) {
            return 1;
        }

        if (firstDate > secondDate) {
            return -1;
        }

        return 0;
    });

    return {
        props: {
            data
        }
    };
}

export default HomePage;