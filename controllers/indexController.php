<?php

class indexController extends Controller {

	public function index(){
		$message = file_get_contents("indexPage.html");;
		$this->setResponce($message);
	}
}