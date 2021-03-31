<?php

declare(strict_types=1);

namespace Flowpack\Media\Ui\Service;

/*
 * This file is part of the Flowpack.Media.Ui package.
 *
 * (c) Contributors of the Neos Project - www.neos.io
 *
 * This package is Open Source Software. For the full copyright and license
 * information, please view the LICENSE file which was distributed with this
 * source code.
 */

use Neos\Flow\Annotations as Flow;
use Neos\Flow\ObjectManagement\ObjectManagerInterface;
use Neos\Flow\Reflection\ReflectionService;
use Neos\Media\Domain\Strategy\AssetUsageStrategyInterface;

/**
 * @Flow\Scope("singleton")
 */
class SimilarityService
{

    /**
     * @Flow\Inject
     * @var ReflectionService
     */
    protected $reflectionService;

    /**
     * @Flow\Inject
     * @var ObjectManagerInterface
     */
    protected $objectManager;

    /**
     * @return array<AssetUsageStrategyInterface>
     */
    protected function getSimilarityStrategies(): array
    {
        $similarityStrategies = [];
        $assetSimilarityStrategyImplementations = $this->reflectionService->getAllImplementationClassNamesForInterface(AssetSimilarityStrategyInterface::class);
        foreach ($assetSimilarityStrategyImplementations as $assetSimilarityStrategyImplementation) {
            $similarityStrategies[] = $this->objectManager->get($assetSimilarityStrategyImplementation);
        }
        return $similarityStrategies;
    }
}
