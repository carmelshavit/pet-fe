import React, { useContext } from "react";

import LoginContext from "../../context/LoginContext";

import {
  Modal,
  Card,
  Image,
  CardContent,
  CardMeta,
  Button,
} from "semantic-ui-react";

export default function PetDetails({
  pet,
  modalOpen,
  setModalOpen,
  handleAdoption,
}) {
  const { loggedInUser } = useContext(LoginContext);

  const closeModal = () => {
    setModalOpen(false);
  };

  const copyPetLink = () => {
    const petLink = `http://localhost:5173/pet/${pet.id}`;
    navigator.clipboard
      .writeText(petLink)
      .then(() => {
        console.log("Pet link copied to clipboard:", petLink);
      })
      .catch((error) => {
        console.error("Error copying pet link:", error);
      });
  };

  return (
    <Modal open={modalOpen} onClose={closeModal}>
      {pet && (
        <>
          <Modal.Header>{pet.name}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={pet.imgFile} />
            <Modal.Description>
              <Card>
                <CardContent size="medium">
                  <CardMeta>Type: {pet.type}</CardMeta>
                  <CardMeta>Adoption Status: {pet.adoption_status}</CardMeta>
                  <CardMeta>Height: {pet.height}</CardMeta>
                  <CardMeta>Weight: {pet.weight}</CardMeta>
                  <CardMeta>Color: {pet.color}</CardMeta>
                  <CardMeta>Bio: {pet.bio}</CardMeta>
                  <CardMeta>
                    Hypoallergenic: {pet.hypoallergenic ? "Yes" : "No"}
                  </CardMeta>
                  <CardMeta>
                    Dietary Restrictions: {pet.dietary_restrictions}
                  </CardMeta>
                  <CardMeta>Breed: {pet.breed}</CardMeta>
                  <Button onClick={copyPetLink}>copy pet link</Button>
                  <Button
                    basic
                    color="violet"
                    onClick={(e) => handleAdoption(pet.id, e)}
                  >
                    {loggedInUser.adoptedPets.some(
                      (adoptedPet) => adoptedPet.id === pet.id
                    )
                      ? "Return"
                      : "Adopt"}
                  </Button>
                </CardContent>
              </Card>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <button onClick={closeModal}>Close</button>
          </Modal.Actions>
        </>
      )}
    </Modal>
  );
}
