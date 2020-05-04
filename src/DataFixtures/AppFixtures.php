<?php

namespace App\DataFixtures;

use App\Entity\Customer;
use App\Entity\Facture;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    /**
     * L'encodeur de mot de pass
     * @var UserPasswordEncoderInterface
     */

    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
       $faker = Factory::create('fr_FR');


        for ($u=0; $u <mt_rand(5, 20) ; $u++) {
            $chrono = 1;
            $user = new User();
            $hash = $this->encoder->encodePassword($user,"0123456");
            $user->setPrenom($faker->firstName())
                ->setNom($faker->lastName())
                ->setEmail($faker->email())
                ->setPassword($hash);

                $manager->persist($user);

                for ($c=0; $c < mt_rand(5 , 20); $c++) {
                    $customer = new Customer();
                    $customer->setNom($faker->firstName())
                             ->setPrenom($faker->lastName())
                             ->setEmail($faker->email())
                             ->setCompany($faker->company)
                             ->setUser($user);
                 $manager->persist($customer);
                 
                 for ($i=0; $i < mt_rand(3 , 10); $i++) {
                    $facture = new Facture();
                    $facture->setMontant($faker->randomFloat(2, 250, 5000))
                            ->setSentAt($faker->dateTimeBetween('-6 months'))
                            ->setStatus($faker->randomElement(['ENVOYé','PAYé','ANNULé']))
                            ->setCustomer($customer)
                            ->setChrono($chrono);

                     $chrono++;
                     $manager->persist($facture);
                }
                }


        }



        $manager->flush();
    }
}
