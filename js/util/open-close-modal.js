export async function openModal(modalId) {
  const $Modal = document.getElementById(`${modalId}`);
  $Modal.classList.remove('hidden');
  $Modal.classList.add('flex');
  $Modal.classList.add('bg-gray-500/75');
  document.addEventListener('click', (event) => {
    if (event.target.id === `${modalId}`) {
      let id = event.target.id;
      closeModal(id);
    }
  });
}

export async function closeModal(id) {
  const $Modal = document.getElementById(`${id}`);
  $Modal.classList.add('hidden');
  $Modal.classList.remove('flex');
}
