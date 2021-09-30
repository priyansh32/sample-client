const getJsonIndented = (obj) => JSON.stringify(obj, null, 4)

const JSONDisplayer = ({ children }) => (
    <div id="response">
        <h2>Response</h2>
        <pre>{getJsonIndented(children)}</pre>
    </div>
)

export default JSONDisplayer;