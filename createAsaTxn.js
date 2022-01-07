import algosdk from 'algosdk'

export default function createAsaTxn(params,args={}){

      let txn = {}

      let addr = args.creator
      let note = args.note || ""
      let totalIssuance = args.amount || 1
      let decimals = (args.decimals !== undefined)?args.decimals:6
      let defaultFrozen = args.defaultFrozen || false
      let manager = args.manager || undefined
      let clawback = args.clawback || undefined
      let reserve = args.reserve || undefined
      let freeze = args.freeze || undefined
      let assetName = args.assetName || ""
      let unitName = args.unitName || args.assetName
      let assetURL = args.assetURL || undefined
      let assetMetadataHash = args.assetMetadataHash || undefined

      console.log("Preparing create ASA transaction...")

      txn = algosdk.makeAssetCreateTxn(addr, 1000, params["last-round"],params["last-round"] + 1000, note,params["genesis-hash"],params["genesis-id"],
        totalIssuance, decimals, defaultFrozen, manager, reserve, freeze,
        clawback, unitName, assetName, assetURL, assetMetadataHash, undefined);

      return txn

  }