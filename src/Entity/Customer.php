<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CustomerRepository")
 * @ApiResource(
 *  normalizationContext= {
 *     "groups"= {"customer_read"}
 * }
 * )
 */
class Customer
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"customer_read","facture_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read","facture_read"})
     * @Assert\NotBlank(message = "Le prenom du client est abligatoire")
     * @Assert\Length(min=2, minMessage="le prenom doit compter au moins 2 caractères",
     *                max = 255, maxMessage="le prenom doit compter au max 255 caractères" )
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read","facture_read"})
     *  @Assert\NotBlank(message = "Le nom de famille du client est abligatoire")
     * @Assert\Length(min=2, minMessage="Lenom de famille doit compter au moins 2 caractères",
     *                max = 255, maxMessage="Le nom de famille doit compter au max 255 caractères" )
     */
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"customer_read","facture_read"})
     * @Assert\NotBlank(message = "L'email de famille du client est abligatoire")
     * @Assert\Email(message = "Le format de l'adresse email doit être valide")
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"customer_read","facture_read"})
     */
    private $company;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Facture", mappedBy="customer")
     * @Groups({"customer_read"})
     * @ApiSubresource
     */
    private $factures;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="customers")
     * @Groups({"customer_read"})
     */
    private $user;

    public function __construct()
    {
        $this->factures = new ArrayCollection();
    }

    /**
     * Total des factures
     *  @Groups({"customer_read"})
     * @return float
     */

    public function getTotalMontant(): float{
        return array_reduce($this->factures->toArray(), function($total, $facture){
            return $total + $facture->getMontant();
        }, 0);
    }

    /**
     * Recupéré le montant total non payé
     *  @Groups({"customer_read"})
     * @return float
     */


    public function getNompaye(): float {
        return array_reduce($this->factures->toarray(), function($total, $facture){
            return $total + ($facture->getStatus() === "PAYé" || $facture->getStatus() === "ANNULé" ? 0 :
            $facture->getMontant());
        }, 0);
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection|Facture[]
     */
    public function getFactures(): Collection
    {
        return $this->factures;
    }

    public function addFacture(Facture $facture): self
    {
        if (!$this->factures->contains($facture)) {
            $this->factures[] = $facture;
            $facture->setCustomer($this);
        }

        return $this;
    }

    public function removeFacture(Facture $facture): self
    {
        if ($this->factures->contains($facture)) {
            $this->factures->removeElement($facture);
            // set the owning side to null (unless already changed)
            if ($facture->getCustomer() === $this) {
                $facture->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}
