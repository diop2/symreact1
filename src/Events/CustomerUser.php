<?php
namespace App\Events;

use App\Entity\Customer;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class CustomerUser implements EventSubscriberInterface
{
    private $security;

    public function __construct( Security $security )
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return[
            KernelEvents::VIEW => ['setUserForCustomer', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function SetUserForCustomer(GetResponseForControllerResultEvent $event){
        $customer = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($customer instanceof Customer && $method === "POST" ) {
            //Choper l'utilisateur connecté

            $user = $this->security->getUser();

            //Assigner l'utilisateur au customer créer

            $customer->setUser($user);
        }


    }

}

