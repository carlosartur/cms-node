import "bootstrap/dist/css/bootstrap.min.css";
import ArticleForm from "../../components/ArticleForm";

function AddPage() {    
    return (
        <div className="container">                    
            <div className="card align-middle">
                <div className="card-header">
                    <h3 className="text-center">Adicionar novo Artigo</h3>
                </div>
                <div className="card-body">
                    <section>
                        <ArticleForm />
                    </section>
                </div>
                <div className="card-footer">
                    <div className="float-end">
                        <button type="submit" className="btn btn-primary" onClick={SubmitForm}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

async function SubmitForm() {
    try {
        let data = {
            "title": document.getElementById("articleTitle").value,
            "body": document.getElementsByClassName("ProseMirror")[0].innerHTML,
            "author": "oculto, obrigatório",
            "status": document.getElementById("articlePublished").checked
        };

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
                            "op": "add",
                            "path": "/article",
                            "value": data
                        }
                    ]
                )
            }
        );
    
        alert("Artigo criado com sucesso!");

        document.location.href = "/";
    } catch (error) {
        alert("Falha ao criar artigo!");
    }
}

export default AddPage;