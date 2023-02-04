const DepartList = ({ departments }) => {
    return (
        <div className="blog-preview">
            {departments.map(department => (
                <div className="blog-preview" key={department.id} >
                    <h2>{ department.name_department }</h2>
                    <p>Сотрудник { department.employee }</p>
                </div>
            ))}
        </div>
    );
}

export default DepartList;