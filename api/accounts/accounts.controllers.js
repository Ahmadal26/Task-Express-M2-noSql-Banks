let accounts = require("../../accounts");
const Account = require("../../db/models/Account");

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = Account.create(req.body);
    return res.status(201).json(newAccount);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    await foundAccount.deleteOne();
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);
    if (!foundAccount) {
      return res.status(404).json({ message: "Account not found" });
    }
    await foundAccount.updateOne(req.body);
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find().select("-createdAt -updateAt");
    return res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAccountByUsername = (req, res) => {
  const { username } = req.params;
  const foundAccount = accounts.find(
    (account) => account.username === username
  );
  if (req.query.currency === "usd") {
    const accountInUsd = { ...foundAccount, funds: foundAccount.funds * 3.31 };
    res.status(201).json(accountInUsd);
  }
  res.status(201).json(foundAccount);
};
