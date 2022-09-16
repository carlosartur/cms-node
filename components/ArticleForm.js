import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
import { useState } from 'react';


const MenuBar = ({ editor }) => {
    if (!editor) {
        return null
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className="btn btn-outline-secondary"
            >
                bold
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className="btn btn-outline-secondary "
            >
                italic
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className="btn btn-outline-secondary"
            >
                strike
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className="btn btn-outline-secondary"
            >
                paragraph
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className="btn btn-outline-secondary "
            >
                h1
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className="btn btn-outline-secondary "
            >
                h2
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className="btn btn-outline-secondary "
            >
                h3
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className="btn btn-outline-secondary "
            >
                h4
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className="btn btn-outline-secondary "
            >
                h5
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className="btn btn-outline-secondary "
            >
                h6
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="btn btn-outline-secondary "
            >
                bullet list
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className="btn btn-outline-secondary "
            >
                ordered list
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className="btn btn-outline-secondary "
            >
                code block
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className="btn btn-outline-secondary "
            >
                blockquote
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                horizontal rule
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => editor.chain().focus().setHardBreak().run()}>
                hard break
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => editor.chain().focus().undo().run()}>
                undo
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => editor.chain().focus().redo().run()}>
                redo
            </button>
        </div>
    );
}

const EditorComponent = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `<br/>`.repeat(10),
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}

function ArticleForm(data) {
    const article = data.data;
    let content = article?.content?.sort((a, b) => {
        let firstDate = new Date(a.updatedAt),
            secondDate = new Date(b.updatedAt);
        
        if (firstDate < secondDate) {
            return -1;
        }

        if (firstDate > secondDate) {
            return 1;
        }

        return 0;
    });

    const [isChecked, setIsChecked] = useState(article?.status);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <form>
            <input value={JSON.stringify(article)} id="article-info" type="hidden"/>
            <label htmlFor="articleTitle">Título</label>
            <div className="input-group mb-3">
                <input value={ article?.id.replace("article#", "") } id="articleId" type="hidden" />
                <input
                    type="text"
                    className="form-control"
                    id="articleTitle"
                    aria-describedby="articleTitle"
                    placeholder="Título"
                    required="required"
                    value={ article?.title }
                />
                <div className="input-group-text">
                    <label htmlFor="articlePublished">Publicar</label>&nbsp;
                    <input
                        id="articlePublished"
                        className="form-check-input mt-0"
                        type="checkbox"
                        value=""
                        checked={isChecked}
                        onChange={handleOnChange}
                    />
                </div>
            </div>

            {content?.length > 0 &&
                <div>
                    <h5>
                        Histórico de modificações: {content.length > 1
                            ? `${content.length} versões`
                            : `1 versão`
                        }
                    </h5>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Data de criação</th>
                                <th scope="col">Data de modificação</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {content.map(element => {
                                return (<tr>
                                    <th scope="row">{element.id}</th>
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
                                    <td>
                                        <button type="button" className="btn btn-primary" onClick={() => LoadContent(element.id)}>Carregar versão</button>
                                    </td>
                                </tr>); 
                            })}
                        </tbody>
                    </table>
                </div>
            }
            
            <div>
                <EditorComponent />
            </div>
        </form>
    );
}

export function LoadContent(contentId) {
    let article = JSON.parse(document.getElementById("article-info").value);
    let content = article.content.filter(item => item.id == contentId).shift();

    document.getElementsByClassName("ProseMirror")[0].innerHTML = content.body;
}

export default ArticleForm;