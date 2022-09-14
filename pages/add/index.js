import "bootstrap/dist/css/bootstrap.min.css";
import ArticleForm from "../../components/ArticleForm";


function AddPage({ data }) {    
    return (
        <div class="container">
            <div class="card align-middle">
                <div class="card-header">
                    <h3 class="text-center">Adicionar novo Artigo</h3>
                </div>
                <div class="card-body">
                    <section>
                        <ArticleForm />
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

async function SubmitForm() {
    let data = {
        "title": document.getElementById("articleTitle").value,
        "body": document.getElementsByClassName("ProseMirror")[0].innerHTML,
        "author": "oculto, obrigatório",
        "status": document.getElementById("articlePublished").checked
    };

    const url = new URL('/create', "http://localhost:8080");
    const res = await fetch(
        url,
        {
            method: "POST",
            body: JSON.stringify(data)
        }
    );
    
    return { res };
}

export default AddPage;