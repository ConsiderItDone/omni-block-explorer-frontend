import { gql } from 'apollo-boost';

export const BLOCKS = gql`
  query Blocks($skip: Int) {
    blocks(take: 10, skip: $skip) {
      items {
        number
        timestamp
        extrinsics {
          index
        }
        events {
          index
        }
        hash
        finalized
      }
      totalCount
    }
  }
`;

export const HOMEPAGE = gql`
  query HomePage {
    lastFinalizedBlock {
      number
    }
    signedExtrinsics: extrinsics(signedOnly: true) {
      totalCount
    }
    blocks(take: 10) {
      items {
        number
        hash
        extrinsics {
          length
        }
        events {
          index
        }
        finalized
        timestamp
      }
    }
    transfers: events(take: 10, eventName: "Transfer", callModule: "balances") {
      items {
        extrinsic {
          hash
          block {
            number
            timestamp
          }
          index
        }
        index
        data
      }
      totalCount
    }
  }
`;
export const SUBSCRIPTION_NEW_BLOCKS = gql`
  subscription NewBlocks {
    newBlock {
      number
      extrinsics {
        length
      }
      events {
        index
      }
      timestamp
      finalized
      hash
    }
  }
`;
export const SUBSCRIPTION_NEW_TRANSFERS = gql`
  subscription NewTransfers {
    newEventByName(eventName: "Transfer") {
      extrinsic {
        hash
        block {
          number
        }
        index
      }
      index
      data
    }
  }
`;
export const BLOCK = gql`
  query Block($id: String!) {
    blockByHash(hash: $id) {
      number
      finalized
      timestamp
      hash
      parentHash
      stateRoot
      extrinsicsRoot
      specVersion
      extrinsics {
        index
        hash
        block {
          number
          timestamp
        }
        success
        module {
          name
        }
        extrinsicType {
          name
        }
        params
      }
      events {
        index
        extrinsicHash
        module {
          name
        }
        eventType {
          name
        }
        data
      }
      logs {
        index
        type
        data
      }
    }
    blockByBlockNumber(number: $id) {
      number
      finalized
      timestamp
      hash
      parentHash
      stateRoot
      extrinsicsRoot
      specVersion
      extrinsics {
        index
        hash
        block {
          number
          timestamp
        }
        success
        module {
          name
        }
        extrinsicType {
          name
        }
        params
      }
      events {
        index
        extrinsicHash
        module {
          name
        }
        eventType {
          name
        }
        data
      }
      logs {
        index
        type
        data
      }
    }
  }
`;

export const TRANSFERS = gql`
  query Transfers($skip: Int, $filters: JSON) {
    events(take: 10, eventName: "Transfer", callModule: "balances", skip: $skip, filters: $filters) {
      items {
        extrinsic {
          hash
          block {
            number
            timestamp
          }
          index
        }
        index
        data
      }
      totalCount
    }
  }
`;

export const CHART_TRANSFERTS = gql`
  query ChartTransfers {
    transfersChartData {
      date
      amount
      quantity
    }
  }
`;

export const CHART_EXTRINSICS = gql`
  query ChartExtrinsics {
    extrinsicsChartData {
      quantity
      date
    }
  }
`;

export const ACCOUNTS = gql`
  query Accounts($skip: Int) {
    accounts(take: 10, skip: $skip) {
      items {
        address
        balance {
          free
          feeFrozen
          miscFrozen
          reserved
        }
      }
      totalCount
    }
  }
`;

export const EXTRINSICS = gql`
  query Extrinsics(
    $callModule: String
    $callFunction: String
    $signedOnly: Boolean
    $skip: Int
    $dateStart: DateType = ""
    $dateEnd: DateType = ""
    $signer: String = ""
  ) {
    extrinsics(
      take: 10
      skip: $skip
      callModule: $callModule
      callFunction: $callFunction
      signedOnly: $signedOnly
      signer: $signer
      dateStart: $dateStart
      dateEnd: $dateEnd
    ) {
      totalCount
      items {
        block {
          number
          timestamp
        }
        index
        hash
        success
        module {
          name
        }
        extrinsicType {
          name
        }
        params
      }
    }
  }
`;

export const EXTRINSICSDETAILTS = gql`
  query ExtrinsicsDetails($id: String!) {
    extrinsicById(id: $id) {
      index
      block {
        number
        timestamp
        finalized
      }
      hash
      module {
        name
      }
      extrinsicType {
        name
      }
      signer {
        address
      }
      fee
      nonce
      success
      params
      signature
      events(eventNames: ["All"]) {
        index
        extrinsicHash
        module {
          name
        }
        data
        eventType {
          name
        }
      }
    }
  }
`;

export const EVENTS = gql`
  query Events(
    $callModule: String
    $eventName: String
    $skip: Int
    $dateStart: DateType
    $dateEnd: DateType
    $extrinsicHash: String
  ) {
    events(
      take: 10
      callModule: $callModule
      eventName: $eventName
      skip: $skip
      extrinsicHash: $extrinsicHash
      dateStart: $dateStart
      dateEnd: $dateEnd
    ) {
      totalCount
      items {
        block {
          number
          timestamp
        }
        index
        extrinsicHash
        extrinsic {
          index
        }
        module {
          name
        }
        eventType {
          name
        }
        data
      }
    }
  }
`;

export const SEARCH = gql`
  query Search($value: String!) {
    accountByAddress(address: $value) {
      address
    }
    blockByHash(hash: $value) {
      hash
    }
    blockByBlockNumber(number: $value) {
      number
    }
    extrinsicById(id: $value) {
      block {
        number
      }
      index
    }
  }
`;

export const ACCOUNTBYADDRESS = gql`
  query AccountByAddress($address: String!) {
    accountByAddress(address: $address) {
      address
      nonce
      refcount
      balance {
        free
        feeFrozen
        miscFrozen
        reserved
      }
      extrinsics {
        block {
          number
          timestamp
        }
        index
        hash
        success
        module {
          name
        }
        extrinsicType {
          name
        }
        params
      }
    }
    transfersFrom: events(eventName: "Transfer", filters: { from: $address }) {
      items {
        extrinsic {
          hash
          block {
            number
            timestamp
          }
          index
        }
        data
        index
      }
    }
    transfersTo: events(eventName: "Transfer", filters: { to: $address }) {
      items {
        extrinsic {
          hash
          block {
            number
            timestamp
          }
          index
        }
        data
        index
      }
    }
  }
`;

export const EXTRINSIC_FILTER_OPTIONS = gql`
  query ExtrinsicFilterOptions {
    modules {
      items {
        name
        extrinsicTypes {
          name
        }
      }
    }
  }
`;

export const EVENT_FILTER_OPTIONS = gql`
  query EventFilterOptions {
    modules {
      items {
        name
        eventTypes {
          name
        }
      }
    }
  }
`;

export const TRANSFERDETAILS = gql`
  query TransferDetails($blockNumber: Float!, $extrinsicIndex: Float!, $eventIndex: Float!) {
    eventsByIndex(blockNumber: $blockNumber, extrinsicIndex: $extrinsicIndex, eventIndex: $eventIndex) {
      items {
        module {
          name
        }
        eventType {
          name
        }
        index
        extrinsicHash
        extrinsic {
          nonce
          hash
          index
          success
        }
        block {
          number
          timestamp
          finalized
        }
        data
      }
    }
  }
`;
