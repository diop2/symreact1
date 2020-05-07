<?php

namespace App\Events;

use App\Entity\Facture;
use App\Repository\FactureRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;

class ChronoDesFacture  implements EventSubscriberInterface
{
    private $security;

    private $repository;

    public function __construct(Security $security, FactureRepository $repository)
    {
        $this->security = $security;
        $this->repository = $repository;
    }

    public static function getSubscribedEvents()
    {

        return [
            KernelEvents::VIEW =>['setChronoForFacture', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setChronoForFacture(GetResponseForControllerResultEvent $event){

        $facture = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($facture instanceof Facture && $method === "POST") {

            $nextChrono = $this->repository->findNextChrono($this->security->getUser());
            $facture->setChrono($nextChrono);
            $facture->setSentAt(new\DateTime());
        }

    }
}

