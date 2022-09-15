import "bootstrap/dist/css/bootstrap.min.css";
import ArticleForm from "../../components/ArticleForm";

function EditPage({ data }) {
    return (
        <div class="container">                    
            <div class="card align-middle">
                <div class="card-header">
                    <h3 class="text-center">Editar Artigo</h3>
                </div>
                <div class="card-body">
                    <section>
                        <ArticleForm data={data} />
                    </section>
                </div>
                <div class="card-footer">
                    <div class="float-end">
                        <button type="submit" class="btn btn-primary" onClick={SubmitForm}>
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
            "author": "oculto, obrigatório",
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
