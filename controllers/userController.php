<?php
class userController extends Controller
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
        if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['score'])){
            $dataToSave=array('id'=>$_POST['id'], 'name' => $_POST['name'],'score' => $_POST['score']);
            $addedItem=$this->model->create($dataToSave);
            $this->setResponce($addedItem);
        }
    }


    public function edit()
    {
        $_put = array();
        parse_str(file_get_contents("php://input"),$_put);

        if(isset($_put['id']) && isset($_put['name']) && isset($_put['score'])) {
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