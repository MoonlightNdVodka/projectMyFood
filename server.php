<?

//Эта конструкция позволяет получить JSON данные для пхп, и уже можно с ними работать
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);