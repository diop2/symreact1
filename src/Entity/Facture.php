<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


/**
 * @ORM\Entity(repositoryClass="App\Repository\FactureRepository")
 * @ApiResource(
 *  normalizationContext= {
 *     "groups"= {"facture_read"}
 * },
 * denormalizationContext={"disable_type_enforcement"= true}
 * )
 */
class Facture
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"facture_read","customer_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     * @Groups({"facture_read","customer_read"})
     * @Assert\NotBlank(message = "Le montant est obligatoire !")
     * @Assert\Type(type ="numeric", message = "le montant n'est de bon dormat!")
     */
    private $montant;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"facture_read","customer_read"})
     * @Assert\DateTime(message = "la date doit être de format YYY-MM-DD")
     * @Assert\NotBlank(message = "la date doit être renseignée")
     */
    private $sentAt;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"facture_read","customer_read"})
     * @Assert\NotBlank(message = "le statut doit être renseignée")
     * @Assert\Choice(choices={"ENVOYé", "PAYé", "ANNULé"},
     *  message = "le statut doit être ENVOYé, PAYé ou ANNULé"
     * )
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Customer", inversedBy="factures")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"facture_read"})
     * @Assert\NotBlank(message = "le le client de la facture doit être renseignée")
     */
    private $customer;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"facture_read"})
     * @Assert\NotBlank(message = "le chrono doàit être renseignée")
     * @Assert\Type(type = "integer", message = "le type doit être un entier")
     */
    private $chrono;

      /**
     * permet de recupéré le user du facture
     *@Groups({"facture_read"})
     *@return User
     */

    public function getUser() : User {
        return $this->customer->getUser();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMontant(): ?float
    {
        return $this->montant;
    }

    public function setMontant($montant): self
    {
        $this->montant = $montant;

        return $this;
    }

    public function getSentAt(): ?\DateTimeInterface
    {
        return $this->sentAt;
    }

    public function setSentAt(\DateTimeInterface $sentAt): self
    {
        $this->sentAt = $sentAt;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getCustomer(): ?Customer
    {
        return $this->customer;
    }

    public function setCustomer(?Customer $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getChrono(): ?int
    {
        return $this->chrono;
    }

    public function setChrono($chrono): self
    {
        $this->chrono = $chrono;

        return $this;
    }
}
