<?php
require_once 'database/database.php';

class Questions
{
	//Définition des tables dans la bdd
	private $ansTable = 'tblanswers';
	private $quesTable = 'tblquestions';
	private $quizTable = 'tblquizzes';
	private $conn;
	private $id;

	public function __construct()
	{
		$database = new Database();
		$this->conn = $database->getConnection();
	}

	//Update active to 0
	public function deleteQuestion($id)
	{
		//query
		$query = "UPDATE $this->quesTable SET active = '0' WHERE idQuestions = :id";
		//prepare de la query
		$stmt = $this->conn->prepare($query);
		
		$this->id = htmlspecialchars(strip_tags($id->question));
		
		$stmt->bindParam(':id',$this->id);
		
		// Execution
		if ($stmt->execute()) {
			header('Access-Control-Allow-Origin: *');
			return true;
		}
		return false;
	}

	function bindParam($stmt, $index, $param)
	{
		htmlspecialchars(strip_tags($index));
		$stmt->bindParam(':' . $index, $param);
	}
}
