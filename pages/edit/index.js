import "bootstrap/dist/css/bootstrap.min.css";
import ArticleForm from "../../components/ArticleForm";

function EditPage({ data }) {
    return (
        <div className="container">                    
            <div className="card align-middle">
                <div className="card-header">
                    <h3 className="text-center">Editar Artigo</h3>
                </div>
                <div className="card-body">
                    <section>
                        <ArticleForm data={data} />
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

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:8080/get?id=${context.query.id}`);
    const data = await res.json();

    return {
        props: {
            data
        }
    };
}

async function SubmitForm() {
    try {
        let data = {
            "title": document.getElementById("articleTitle").value,
            "body": document.getElementsByClassName("ProseMirror")[0].innerHTML,
            "author": "Anônimo",
            "status": document.getElementById("articlePublished").checked
        };

        let articleId = document.getElementById("articleId").value;

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
                            "op": "replace",
                            "path": `/article/${articleId}`,
                            "value": data
                        }
                    ]
                )
            }
        );
    
        alert("Artigo editado com sucesso!");

        document.location.href = "/";
    } catch (error) {
        alert("Falha ao editar artigo!");
    }
}

export default EditPage;
