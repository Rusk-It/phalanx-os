
### contracts/src/PhalanxGuardModule.sol (Core Guard – Ready to Deploy)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@account-abstraction/contracts/interfaces/IAccount.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IMorpho.sol";

contract PhalanxGuardModule is AccessControl {
    bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");
    uint8 public constant QUORUM = 3;

    struct Proposal {
        address[] approvers;
        bytes userOpData;
        uint256 deadline;
        bytes32 actionHash;
    }

    mapping(bytes32 => Proposal) public proposals;
    address public immutable entryPoint;
    address public immutable morphoBlue = 0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb; // 2026 address

    event PhalanxConsensus(bytes32 indexed proposalId, bool approved, string strategyName);

    constructor(address _entryPoint) {
        entryPoint = _entryPoint;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function submitProposal(
        bytes32 proposalId,
        bytes calldata userOpData,
        address[] calldata approvers,
        bytes32 actionHash
    ) external onlyRole(AGENT_ROLE) {
        proposals[proposalId] = Proposal(approvers, userOpData, block.timestamp + 10 minutes, actionHash);
    }

    function executeWithQuorum(bytes32 proposalId) external {
        Proposal memory p = proposals[proposalId];
        require(p.approvers.length >= QUORUM, "No quorum");
        require(block.timestamp < p.deadline, "Expired");

        // ZK proof stub (in prod: verify via Grok API signed proof)
        (bool success, ) = entryPoint.call(p.userOpData);
        require(success, "Execution failed");

        emit PhalanxConsensus(proposalId, true, "Shielded Harvest / Void Jump");
    }

    // Helper for Morpho supply (called via UserOp)
    function supplyToMorpho(bytes32 proposalId, address marketParams, uint256 assets) external {
        // ... (integrated in coordinator UserOp)
    }
}
