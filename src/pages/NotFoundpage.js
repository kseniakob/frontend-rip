import { Link } from "react-router-dom";
const NotFoundpage =() => {
    return(
        <div>
            <h1>
                Эта страница не существует. Пожалуйста, перейдите по ссылке на <Link to="/">главную страницу.</Link>
            </h1>
        </div>
    )
}
export {NotFoundpage}