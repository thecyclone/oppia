// Copyright 2016 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Directive for displaying and editing a collection details.
 * Edit options include: changing the title, objective, and category, and also
 * adding a new exploration.
 *
 * @author mgowano@google.com (Abraham Mgowano)
 */

oppia.directive('collectionDetailsEditorDirective', [function() {
  return {
    restrict: 'E',
    scope: {
      getCollection: '&collection'
    },
    templateUrl: 'inline/collection_details_editor_directive',
    controller: ['$scope', 'CollectionUpdateService',
      'CollectionNodeObjectFactory', 'warningsData', function(
      $scope, CollectionUpdateService, CollectionNodeObjectFactory,
      warningsData) {
      $scope.addExploration = function() {
        if (!$scope.newExplorationId) {
          warningsData.addWarning('Cannot add an empty exploration ID.');
          return;
        }
        var collection = $scope.getCollection();
        if (collection.containsCollectionNode($scope.newExplorationId)) {
          warningsData.addWarning(
            'Exploration with id ' + $scope.newExplorationId +
            ' is already added');
          return;
        }
        CollectionUpdateService.addCollectionNode(
          collection, $scope.newExplorationId);
        $scope.newExplorationId = '';
      };

      $scope.updateCollectionTitle = function() {
        if (!$scope.newCollectionTitle) {
          warningsData.addWarning('Cannot set empty collection title.');
          return;
        }
        var collection = $scope.getCollection();
        CollectionUpdateService.setCollectionTitle(
          collection, $scope.newCollectionTitle);
        $scope.newCollectionTitle = '';
      };

      $scope.updateCollectionCategory = function() {
        if (!$scope.newCollectionCategory) {
          warningsData.addWarning('Cannot set empty collection category.');
          return;
        }
        var collection = $scope.getCollection();
        CollectionUpdateService.setCollectionCategory(
          collection, $scope.newCollectionCategory);
        $scope.newCollectionCategory = '';
      };

      $scope.updateCollectionObjective = function() {
        if (!$scope.newCollectionObjective) {
          warningsData.addWarning('Cannot set empty collection objective.');
          return;
        }
        var collection = $scope.getCollection();
        CollectionUpdateService.setCollectionObjective(
          collection, $scope.newCollectionObjective);
        $scope.newCollectionObjective = '';
      };
    }]
  };
}]);
