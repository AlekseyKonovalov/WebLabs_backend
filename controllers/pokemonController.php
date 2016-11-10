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

    public function edit($data){
        $_put = json_decode(file_get_contents('php://input'), true);
        if(isset($_put['id']) && isset($_put['name']) && isset($_put['image']) && isset($_put['power']) && isset($_put['speed'])) {
            $dataToSave=array('id'=>$_put['id'], 'name' => $_put['name'],'image' => $_put['image'],'power' => $_put['power'],'speed' => $_put['speed']);
            $changeItem = $this->model->save($dataToSave, $data['id']);
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