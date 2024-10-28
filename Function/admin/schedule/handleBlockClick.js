const handleBlockClick = (blockX, blockY, setModalPosition) => {
  const BLOCK_WIDTH = -28;
  const MODAL_HEIGHT = 125;

  const modalX = blockX + BLOCK_WIDTH;
  const modalY = blockY - MODAL_HEIGHT;

  setModalPosition({ x: modalX, y: modalY });
};

export default handleBlockClick;
