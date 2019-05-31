import {Component, OnInit} from '@angular/core';
import {EthersService} from './ethers.service';
import {ethers} from 'ethers';

const MULTI_TOKEN_NETWORK_ADDRESSES = [
    '0x0288C13F98d85C817191710BE24E96ec75bD9914',
    '0x3478C2E4Ed6f64db0Be9c483B87F70Ff6ab0D65A'
];
const MultiTokenNetworkABI = [{
    'constant': true,
    'inputs': [{'name': 'wallet', 'type': 'address'}],
    'name': 'allWalletBalances',
    'outputs': [{'name': '', 'type': 'uint256[]'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'index', 'type': 'uint256'}],
    'name': 'disableBundlingMultitoken',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [],
    'name': 'unpause',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'paused',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'index', 'type': 'uint256'}, {'name': 'data', 'type': 'bytes'}],
    'name': 'deploy',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'multitokensCount',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'index', 'type': 'uint256'}],
    'name': 'disableChangesMultitoken',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [],
    'name': 'pause',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'target', 'type': 'address'}, {'name': 'value', 'type': 'uint256'}, {
        'name': 'data',
        'type': 'bytes'
    }],
    'name': 'makeCall',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'deployer', 'type': 'address'}],
    'name': 'addDeployer',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [{'name': '', 'type': 'address'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': 'i', 'type': 'uint256'}],
    'name': 'deployers',
    'outputs': [{'name': '', 'type': 'address'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'index', 'type': 'uint256'}],
    'name': 'deleteDeployer',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'index', 'type': 'uint256'}],
    'name': 'enableBundlingMultitoken',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'deployersCount',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': 'i', 'type': 'uint256'}],
    'name': 'multitokens',
    'outputs': [{'name': '', 'type': 'address'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'allMultitokens',
    'outputs': [{'name': '', 'type': 'address[]'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'index', 'type': 'uint256'}],
    'name': 'deleteMultitoken',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'index', 'type': 'uint256'}, {'name': 'deployer', 'type': 'address'}],
    'name': 'setDeployer',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': '_newOwner', 'type': 'address'}],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'mtkn', 'type': 'address'}],
    'name': 'NewMultitoken',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'index', 'type': 'uint256'}, {
        'indexed': true,
        'name': 'oldDeployer',
        'type': 'address'
    }, {'indexed': true, 'name': 'newDeployer', 'type': 'address'}],
    'name': 'NewDeployer',
    'type': 'event'
}, {'anonymous': false, 'inputs': [], 'name': 'Pause', 'type': 'event'}, {
    'anonymous': false,
    'inputs': [],
    'name': 'Unpause',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'previousOwner', 'type': 'address'}],
    'name': 'OwnershipRenounced',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'previousOwner', 'type': 'address'}, {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address'
    }],
    'name': 'OwnershipTransferred',
    'type': 'event'
}];

const MultiTokenContractABI = [{
    'constant': true,
    'inputs': [],
    'name': 'changeFee',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': '_interfaceId', 'type': 'bytes4'}],
    'name': 'supportsInterface',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'name',
    'outputs': [{'name': '', 'type': 'string'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': '_spender', 'type': 'address'}, {'name': '_value', 'type': 'uint256'}],
    'name': 'approve',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'fromToken', 'type': 'address'}, {'name': 'toToken', 'type': 'address'}, {
        'name': 'amount',
        'type': 'uint256'
    }, {'name': 'minReturn', 'type': 'uint256'}, {'name': 'ref', 'type': 'address'}],
    'name': 'changeWithRef',
    'outputs': [{'name': 'returnAmount', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'totalSupply',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'InterfaceId_ERC165',
    'outputs': [{'name': '', 'type': 'bytes4'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': 'fromToken', 'type': 'address'}, {'name': 'toToken', 'type': 'address'}, {
        'name': 'amount',
        'type': 'uint256'
    }],
    'name': 'getReturn',
    'outputs': [{'name': 'returnAmount', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'inLendingMode',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'bundlingEnabled',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'beneficiary', 'type': 'address'}, {
        'name': 'amount',
        'type': 'uint256'
    }, {'name': 'tokenAmounts', 'type': 'uint256[]'}],
    'name': 'bundleFirstTokens',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'from', 'type': 'address'}, {'name': 'to', 'type': 'address'}, {
        'name': 'value',
        'type': 'uint256'
    }],
    'name': 'transferFrom',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [],
    'name': 'disableBundling',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'decimals',
    'outputs': [{'name': '', 'type': 'uint8'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'to', 'type': 'address'}, {'name': 'value', 'type': 'uint256'}, {
        'name': 'data',
        'type': 'bytes'
    }],
    'name': 'transferAndCall',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'tokens', 'type': 'address[]'}, {'name': 'theName', 'type': 'string'}, {
        'name': 'theSymbol',
        'type': 'string'
    }, {'name': 'theDecimals', 'type': 'uint8'}],
    'name': 'init',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'lendFee',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': 'i', 'type': 'uint256'}],
    'name': 'tokens',
    'outputs': [{'name': '', 'type': 'address'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'fromToken', 'type': 'address'}, {'name': 'toToken', 'type': 'address'}, {
        'name': 'amount',
        'type': 'uint256'
    }, {'name': 'minReturn', 'type': 'uint256'}],
    'name': 'change',
    'outputs': [{'name': 'returnAmount', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': '_spender', 'type': 'address'}, {'name': '_subtractedValue', 'type': 'uint256'}],
    'name': 'decreaseApproval',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'tokens', 'type': 'address[]'}, {
        'name': 'tokenWeights',
        'type': 'uint256[]'
    }, {'name': 'theName', 'type': 'string'}, {'name': 'theSymbol', 'type': 'string'}, {'name': '', 'type': 'uint8'}],
    'name': 'init',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': '_owner', 'type': 'address'}],
    'name': 'balanceOf',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'theReferralFee', 'type': 'uint256'}],
    'name': 'setReferralFee',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [],
    'name': 'renounceOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'changesEnabled',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'referralFee',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [{'name': '', 'type': 'address'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'symbol',
    'outputs': [{'name': '', 'type': 'string'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'tokensCount',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': '_token', 'type': 'address'}],
    'name': 'weights',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': '_to', 'type': 'address'}, {'name': '_value', 'type': 'uint256'}],
    'name': 'transfer',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'beneficiary', 'type': 'address'}, {'name': 'value', 'type': 'uint256'}],
    'name': 'unbundle',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'to', 'type': 'address'}, {'name': 'token', 'type': 'address'}, {
        'name': 'amount',
        'type': 'uint256'
    }, {'name': 'target', 'type': 'address'}, {'name': 'data', 'type': 'bytes'}],
    'name': 'lend',
    'outputs': [],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'beneficiary', 'type': 'address'}, {'name': 'value', 'type': 'uint256'}, {
        'name': 'someTokens',
        'type': 'address[]'
    }],
    'name': 'unbundleSome',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'theChangeFee', 'type': 'uint256'}],
    'name': 'setChangeFee',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [],
    'name': 'disableChanges',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'to', 'type': 'address'}, {'name': 'value', 'type': 'uint256'}, {
        'name': 'data',
        'type': 'bytes'
    }],
    'name': 'approveAndCall',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': true,
    'stateMutability': 'payable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': '_spender', 'type': 'address'}, {'name': '_addedValue', 'type': 'uint256'}],
    'name': 'increaseApproval',
    'outputs': [{'name': '', 'type': 'bool'}],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [{'name': '_owner', 'type': 'address'}, {'name': '_spender', 'type': 'address'}],
    'name': 'allowance',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'theLendFee', 'type': 'uint256'}],
    'name': 'setLendFee',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'InterfaceId_IMultiToken',
    'outputs': [{'name': '', 'type': 'bytes4'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'InterfaceId_IBasicMultiToken',
    'outputs': [{'name': '', 'type': 'bytes4'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': 'beneficiary', 'type': 'address'}, {'name': 'amount', 'type': 'uint256'}],
    'name': 'bundle',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [],
    'name': 'enableBundling',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': false,
    'inputs': [{'name': '_newOwner', 'type': 'address'}],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'TOTAL_PERCRENTS',
    'outputs': [{'name': '', 'type': 'uint256'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {
    'constant': true,
    'inputs': [],
    'name': 'caller',
    'outputs': [{'name': '', 'type': 'address'}],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
}, {'anonymous': false, 'inputs': [], 'name': 'ChangesDisabled', 'type': 'event'}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'who', 'type': 'address'}, {
        'indexed': true,
        'name': 'beneficiary',
        'type': 'address'
    }, {'indexed': false, 'name': 'value', 'type': 'uint256'}],
    'name': 'Bundle',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'who', 'type': 'address'}, {
        'indexed': true,
        'name': 'beneficiary',
        'type': 'address'
    }, {'indexed': false, 'name': 'value', 'type': 'uint256'}],
    'name': 'Unbundle',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': false, 'name': 'enabled', 'type': 'bool'}],
    'name': 'BundlingStatus',
    'type': 'event'
}, {'anonymous': false, 'inputs': [], 'name': 'Update', 'type': 'event'}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': '_fromToken', 'type': 'address'}, {
        'indexed': true,
        'name': '_toToken',
        'type': 'address'
    }, {'indexed': true, 'name': '_changer', 'type': 'address'}, {
        'indexed': false,
        'name': '_amount',
        'type': 'uint256'
    }, {'indexed': false, 'name': '_return', 'type': 'uint256'}],
    'name': 'Change',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'owner', 'type': 'address'}, {
        'indexed': true,
        'name': 'spender',
        'type': 'address'
    }, {'indexed': false, 'name': 'value', 'type': 'uint256'}],
    'name': 'Approval',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'from', 'type': 'address'}, {
        'indexed': true,
        'name': 'to',
        'type': 'address'
    }, {'indexed': false, 'name': 'value', 'type': 'uint256'}],
    'name': 'Transfer',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'previousOwner', 'type': 'address'}],
    'name': 'OwnershipRenounced',
    'type': 'event'
}, {
    'anonymous': false,
    'inputs': [{'indexed': true, 'name': 'previousOwner', 'type': 'address'}, {
        'indexed': true,
        'name': 'newOwner',
        'type': 'address'
    }],
    'name': 'OwnershipTransferred',
    'type': 'event'
}];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    tokens;
    tokenBalances = {};

    constructor(public ethersService: EthersService) {

    }

    async ngOnInit() {

        const multiTokenNetworkContracts = MULTI_TOKEN_NETWORK_ADDRESSES.map(
            addr => new ethers.Contract(
                addr,
                MultiTokenNetworkABI,
                this.ethersService.provider.getSigner()
            )
        );

        const promises = multiTokenNetworkContracts.map(c => c.allMultitokens());
        this.tokens = (await Promise.all(promises)).flatMap(tkns => tkns).filter(
            (item, index, inputArray) => inputArray.indexOf(item) == index
        );

        const walletAddress = await this.ethersService.provider.getSigner().getAddress();

        const requests = [];
        for (let token of this.tokens) {

            const multitokenContract = new ethers.Contract(
                token,
                MultiTokenContractABI,
                this.ethersService.provider.getSigner()
            );

            requests.push(multitokenContract.balanceOf(walletAddress));
        }

        const balances = await Promise.all(requests);

        let index = 0;
        for (let token of this.tokens) {
            this.tokenBalances[token] = ethers.utils.formatEther(balances[index++]);
        }
    }

    async unbundle(token) {

        const multitokenContract = new ethers.Contract(
            token,
            MultiTokenContractABI,
            this.ethersService.provider.getSigner()
        );

        const walletAddress = await this.ethersService.provider.getSigner().getAddress();

        await multitokenContract.unbundle(
            walletAddress,
            await multitokenContract.balanceOf(walletAddress)
        );
    }
}
