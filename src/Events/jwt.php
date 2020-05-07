<?php

namespace App\Events;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class jwt{
    public function updatejwt (JWTCreatedEvent $event){
        $user = $event->getUser();
        $data =$event->getData();
        $data['prenom'] = $user->getPrenom();
        $data['nom'] = $user->getNom();
        $event->setData($data);
    }
}
