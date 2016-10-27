<?php

class pokemonController extends Controller
{
    public function index()
    {
        $examples = $this->model->load();
        $this->setResponce($examples);
    }

    public function view($data)
    {
        $example = $this->model->load($data['id']);
        $this->setResponce($example);
    }

    public function add(){
       if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['image']) && isset($_POST['power']) && isset($_POST['speed'])){
            $dataToSave=array('id'=>$_POST['id'],'name' => $_POST['name'],'image' => $_POST['image'],'power' => $_POST['power'],'speed' => $_POST['speed']);
            $addedItem=$this->model->create($dataToSave);
            $this->setResponce($addedItem);
        }
    }

    public function edit()
    {
        $_put = array();
        parse_str(file_get_contents("php://input"),$_put);

        if(isset($_put['id']) && isset($_put['name']) && isset($_put['image']) && isset($_put['power']) && isset($_put['speed'])) {
            $changeItem = $this->model->save($_put);
            $this->setResponce($changeItem);
        }
    }

    public function delete($data) {
        if (isset($data['id'])) {
            $example = $this->model->delete($data['id']);
            $this->setResponce($example);
        }
    }
}