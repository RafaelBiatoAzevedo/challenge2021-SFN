module.exports = (err: any, _req: any, res: any, _next: any) => {
  const { status, message } = err;

  if (status) return res.status(status).json({ message });

  res.status(500).json({ message: err.message });
};
