import prisma from "../db";

export const getOne = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};
export const getAll = async (req, res) => {
  const updates = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const update = updates.reduce((allProduct, product) => {
    return [...allProduct, product.updates];
  }, []);
  res.json({ data: update });
};
export const create = async (req, res) => {
  const { productId, title, body } = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    res.status(400);
    res.json({ data: "This product does not exist" });
  }
  const update = await prisma.update.create({
    data: {
      title,
      body,
      product: { connect: { id: product.id } },
    },
  });
  res.json({ data: update });
};
export const updated = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allProduct, product) => {
    return [...allProduct, product.updates];
  }, []);

  const match = updates.filter((item) => item.id === req.params.id);
  if (!match) {
    return res.json({ message: "nope" });
  }

  const update = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  return res.json({ data: update });
};
export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allProduct, product) => {
    return [...allProduct, product.updates];
  }, []);

  const match = updates.filter((item) => item.id === req.params.id);
  if (!match) {
    return res.json({ message: "nope" });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  return res.json({ data: deleted });
};
