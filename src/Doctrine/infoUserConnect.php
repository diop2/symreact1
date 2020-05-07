<?php

namespace App\Doctrine;

use Symfony\Component\Security\Core\Security;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Customer;
use App\Entity\Facture;
use App\Entity\User;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;

class infoUserConnect implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
     private $security;
     private $auth;

     public function __construct(Security $security, AuthorizationCheckerInterface $check)
     {
          $this->security = $security;
          $this->auth = $check;
     }

     private function addWhere(QueryBuilder $queryBuilder,string $resourceClass){
        $user = $this->security->getUser();

          if (($resourceClass === Facture::class || $resourceClass === Customer::class) &&
           !$this->auth->isGranted('ROLE_ADMIN') && $user instanceof User)
           {
               $rootAlias = $queryBuilder->getRootAliases()[0];

               if ($resourceClass === Customer::class) {
                    $queryBuilder->andWhere("$rootAlias.user = :user");
               } elseif ($resourceClass === Facture::class) {
                    $queryBuilder->join("$rootAlias.customer", "c")
                                 ->andWhere("c.user = :user");
               }

               $queryBuilder->setParameter("user",$user);

          }
     }

     public function applyToCollection(\Doctrine\ORM\QueryBuilder $queryBuilder, \ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
     {
        $this->addWhere($queryBuilder, $resourceClass);
     }

     public function applyToItem(\Doctrine\ORM\QueryBuilder $queryBuilder, \ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
     {
        $this->addWhere($queryBuilder, $resourceClass);
     }
}
